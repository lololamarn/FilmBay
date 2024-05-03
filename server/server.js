
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

const { getBrands, getBrandById, getBrandByBrandName} = require('../server/DB_functions/Brand_functions/Get_brands');
const { authenticateUser } = require('../server/DB_functions/User_functions/Get_Users');
const { createUser, getUserByEmail } = require('./DB_functions/User_functions/Create_Users');
const { getEmail } = require('./DB_functions/User_functions/Get_mails');
const { changePassword } = require('./DB_functions/User_functions/Change_Pass');
const { searchCameras } = require('./DB_functions/Camera_functions/search_cam');
const { deleteCamera } = require("./DB_functions/Camera_functions/Delete_camera");
const { getCameraById } = require('./DB_functions/Camera_functions/Get_camera');
const { editCamera }= require ("./DB_functions/Camera_functions/edit_camera");
const { addCamera } = require ("./DB_functions/Camera_functions/add_camera.js");

const { editBrand } = require ("./DB_functions/Brand_functions/Edit_Brands.js");
const { deleteBrand } = require ("./DB_functions/Brand_functions/Delete_Brands.js");
const { addBrand } = require ("./DB_functions/Brand_functions/add_Brand.js");

const { getLenses, getLensById, getLensByLensName } = require ( "./DB_functions/Lens_functions/Get_Lens.js");
const { editLens } = require("./DB_functions/Lens_functions/Edit_Lens");
const { deleteLens } = require("./DB_functions/Lens_functions/Delete_Lens");
const { addLens } = require("./DB_functions/Lens_functions/Add_Lens");

const { getMediaById, getMediaByKeyword } = require('./DB_functions/Media_functions/Get_Media');
const { editMedia } = require('./DB_functions/Media_functions/Edit_Media');
const { deleteMedia } = require('./DB_functions/Media_functions/Delete_Media');
const { addMedia } = require('./DB_functions/Media_functions/Add_Media');
const { getCameras } =require ("./DB_functions/Camera_functions/search_cam");

const {getCameraByBrandID,getLensByBrandID,getMediaByBrandID, getBrandByBrandID}=require ("./DB_functions/Multifunctions/GetBy");

app.use(cors());
app.use(express.json());

app.get("/api/brands", async (req, res) => {
    try {
        const brands = await getBrands();
        res.json(brands);
    } catch (error) {
        console.error("Error fetching brands:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/cameras", async (req, res) => {
    try {
        const cameras = await getCameras(); 
        res.json(cameras);
    } catch (error) {
        console.error("Error fetching cameras:", error);
        res.status(500).json({ error: "Internal server error" }); 
    }
});


app.post("/api/authenticate", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authenticateUser(email, password);

        if (user) {
            res.json({ message: "Autenticación exitosa", user });
        } else {
            res.status(401).json({ error: "Credenciales inválidas" });
        }
    } catch (error) {
        console.error("Error al autenticar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.post("/api/create-user", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        const newUser = await createUser(email, password);

        res.json({ message: "Usuario creado exitosamente", user: newUser });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.post("/api/get-mail", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await getEmail(email);

        if (user) {
            res.json({ message: "Correo válido", user });
        } else {
            res.status(401).json({ error: "Correo inválido" });
        }
    } catch (error) {
        console.error("Error al autenticar correo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.post("/api/change-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const result = await changePassword(email, newPassword);
        res.json(result);
    } catch (error) {
        console.error("Error al cambiar contraseña:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.get("/api/search-camera", async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const cameras = await searchCameras(searchTerm); 
        res.json(cameras);
    } catch (error) {
        console.error("Error en la búsqueda de cámaras:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});



app.delete("/api/delete-camera/:cameraId", async (req, res) => {
    try {
        const { cameraId } = req.params;

        const result = await deleteCamera(cameraId);

        if (result.deletedCount === 0) {
            res.json({ message: "Cámara eliminada correctamente" });
        } else {
            res.status(404).json({ error: "No se encontró la cámara para eliminar" });
        }
    } catch (error) {
        console.error("Error al eliminar cámara:", error);
        res.status(500).json({ error: "Error interno del servidor al eliminar cámara" });
    }
});


app.get("/api/get-camera/:cameraId", async (req, res) => {
    try {
        const { cameraId } = req.params;
        const camera = await getCameraById(cameraId);

        if (camera) {
            res.json(camera);
        } else {
            res.status(404).json({ error: "Cámara no encontrada" });
        }
    } catch (error) {
        console.error("Error al obtener cámara por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.put("/api/edit-camera/:cameraId", async (req, res) => {
    try {
        const { cameraId } = req.params;
        const { Camera_Name, Brand, Mount, Detalles } = req.body;

        
        if (!Camera_Name || !Brand || !Mount || !Detalles) {
            return res.status(400).json({ error: "Todos los campos son obligatorios para editar la cámara" });
        }

        
        const existingCamera = await getCameraById(cameraId);
        if (!existingCamera) {
            return res.status(404).json({ error: "Cámara no encontrada" });
        }

        const result = await editCamera(cameraId, Camera_Name, Brand, Mount, Detalles);

        res.json({ message: "Cámara editada exitosamente", camera: result });
    } catch (error) {
        console.error("Error al editar cámara:", error);
        res.status(500).json({ error: "Error interno del servidor al editar cámara" });
    }
});


app.get("/api/get-brand-by-id/:brandId", async (req, res) => {
    try {
        const { brandId } = req.params;
        const brand = await getBrandById(brandId);

        if (brand) {
            res.json(brand);
        } else {
            res.status(404).json({ error: "Marca no encontrada" });
        }
    } catch (error) {
        console.error("Error al obtener marca por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


app.get("/api/searchBrand-byname", async (req, res) => {
    try {
        
        const { searchTerm } = req.query;
        const brand = await getBrandByBrandName(searchTerm); 
        res.json(brand);
        
    } catch (error) {
        console.error("Error al obtener marca por nombre:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


app.post("/api/add-camera", async (req, res) => {
    try {
        const { Camera_Name, Brand_ID, Mount , Detalles} = req.body;

    
        const result = await addCamera(Camera_Name, Brand_ID, Mount , Detalles);

       
        res.json({ message: "Cámara agregada exitosamente", camera: result });
    } catch (error) {
        console.error("Error al agregar cámara:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});



app.put("/api/edit-brand/:brandId", async (req, res) => {
    try {
        const { brandId } = req.params;
        const { Brand_Name, image } = req.body;

    
        if (!Brand_Name || !image) {
            return res.status(400).json({ error: "Todos los campos son obligatorios para editar la marca" });
        }

        const existingBrand = await getBrandById(brandId);
        if (!existingBrand) {
            return res.status(404).json({ error: "Marca no encontrada" });
        }

        const result = await editBrand(brandId, Brand_Name, image);

        res.json({ message: "Marca editada exitosamente", brand: result });
    } catch (error) {
        console.error("Error al editar marca:", error);
        res.status(500).json({ error: "Error interno del servidor al editar marca" });
    }
});



app.delete("/api/delete-brand/:brandId", async (req, res) => {
    try {
        const { brandId } = req.params;

        const result = await deleteBrand(brandId);

        if (result.deletedCount === 0) {
            res.json({ message: "Cámara eliminada correctamente" });
        } else {
            res.status(404).json({ error: "No se encontró la cámara para eliminar" });
        }
    } catch (error) {
        console.error("Error al eliminar cámara:", error);
        res.status(500).json({ error: "Error interno del servidor al eliminar cámara" });
    }
});


app.post("/api/add-brand", async (req, res) => {
    try {
        const { Brand_Name, Image } = req.body; 

       
        const result = await addBrand(Brand_Name, Image); 

 
        res.json({ message: "Marca agregada exitosamente", brand: result }); 
    } catch (error) {
        console.error("Error al agregar marca:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


app.get("/api/lenses", async (req, res) => {
    try {
        const lenses = await getLenses();
        res.json(lenses);
    } catch (error) {
        console.error("Error fetching lenses:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/get-lens/:lensId", async (req, res) => {
    try {
        const { lensId } = req.params;
        const lens = await getLensById(lensId);

        if (lens) {
            res.json(lens);
        } else {
            res.status(404).json({ error: "Lens not found" });
        }
    } catch (error) {
        console.error("Error fetching lens by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/search-lens", async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const lens = await getLensByLensName(searchTerm);
        res.json(lens);
    } catch (error) {
        console.error("Error searching lens by name:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/api/edit-lens/:lensId", async (req, res) => {
    try {
        const { lensId } = req.params;
        const { Lens_Name, Brand_ID, Mount, Focal_length, Detalles } = req.body;

       
        if (!Lens_Name || !Brand_ID || !Mount || !Focal_length || !Detalles) {
            return res.status(400).json({ error: "Todos los campos son obligatorios para editar la lente" });
        }

       
        const existingLens = await getLensById(lensId);
        if (!existingLens) {
            return res.status(404).json({ error: "Lente no encontrada" });
        }

      
        const result = await editLens(lensId, Lens_Name, Brand_ID, Mount, Focal_length, Detalles);

        res.json({ message: "Lente editada exitosamente", lens: result });
    } catch (error) {
        console.error("Error al editar lente:", error);
        res.status(500).json({ error: "Error interno del servidor al editar lente" });
    }
});


app.delete("/api/delete-lens/:lens_ID", async (req, res) => {
    try {
        const { lens_ID } = req.params;

        const result = await deleteLens(lens_ID);

        if (result.deletedCount === 0) {
            res.json({ message: "Lens deleted successfully" });
        } else {
            res.status(404).json({ error: "Lens not found" });
        }
    } catch (error) {
        console.error("Error deleting lens:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/add-lens", async (req, res) => {
    try {
        const { Lens_Name, Brand_ID, Mount, Focal_length, Detalles } = req.body;

        const result = await addLens(Lens_Name, Brand_ID, Mount, Focal_length, Detalles);

        res.json({ message: "Lens added successfully", lens: result });
    } catch (error) {
        console.error("Error adding lens:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/api/media", async (req, res) => {
    try {
        const medias = await getMedias();
        res.json(medias);
    } catch (error) {
        console.error("Error fetching medias:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/api/get-media/:Media_ID", async (req, res) => {
    try {
        const { Media_ID } = req.params;
        const media = await getMediaByBrand(Media_ID);

        if (media) {
            res.json(media);
        } else {
            res.status(404).json({ error: "Media not found" });
        }
    } catch (error) {
        console.error("Error fetching media by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/api/search-media", async (req, res) => {
    try {
        const { keyword } = req.query;
        const media = await getMediaByKeyword(keyword);
        res.json(media);
    } catch (error) {
        console.error("Error searching media by keyword:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.put("/api/edit-media/:mediaId", async (req, res) => {
    try {
        const { mediaId } = req.params;
        const { Keyword, Brand_ID, Camera_ID, Lens_ID, Img_URL } = req.body;

        
        if (!Keyword || !Brand_ID || !Camera_ID || !Lens_ID || !Img_URL) {
            return res.status(400).json({ error: "Todos los campos son obligatorios para editar la lente" });
        }

        
        const mediaexist = await getMediaById(mediaId);
        if (!mediaexist) {
            return res.status(404).json({ error: "Lente no encontrada" });
        }

        
        const result = await editMedia(mediaId, Keyword, Brand_ID, Camera_ID, Lens_ID, Img_URL);

        res.json({ message: "Lente editada exitosamente", media: result });
    } catch (error) {
        console.error("Error al editar lente:", error);
        res.status(500).json({ error: "Error interno del servidor al editar lente" });
    }
});




app.delete("/api/delete-media/:Media_ID", async (req, res) => {
    try {
        const { Media_ID } = req.params;

        const result = await deleteMedia(Media_ID);

        if (result.deletedCount === 0) {
            res.json({ message: "Media deleted successfully" });
        } else {
            res.status(404).json({ error: "Media not found" });
        }
    } catch (error) {
        console.error("Error deleting media:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post("/api/add-media", async (req, res) => {
    try {
        const { Keyword, Brand_ID, Camera_ID, Lens_ID, Img_URL } = req.body;

        const result = await addMedia( Keyword, Brand_ID, Camera_ID, Lens_ID, Img_URL);

        res.json({ message: "Media added successfully", media: result });
    } catch (error) {
        console.error("Error adding media:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get('/api/cameras/byBrand/:Brand_ID', async (req, res) => {
    try {
        const { Brand_ID } = req.params;
        const cameras = await getCameraByBrandID(Brand_ID);

        if (cameras.length > 0) {
            res.json(cameras);
        } else {
            res.status(404).json({ error: 'No cameras found for this brand' });
        }
    } catch (error) {
        console.error('Error fetching cameras by Brand_ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/lenses/byBrand/:Brand_ID', async (req, res) => {
    try {
        const { Brand_ID } = req.params;
        const lenses = await getLensByBrandID(Brand_ID);

        if (lenses.length > 0) {
            res.json(lenses);
        } else {
            res.status(404).json({ error: 'No lenses found for this brand' });
        }
    } catch (error) {
        console.error('Error fetching lenses by Brand_ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/media/byBrand/:Brand_ID', async (req, res) => {
    try {
        const { Brand_ID } = req.params;
        const media = await getMediaByBrandID(Brand_ID);

        if (media.length > 0) {
            res.json(media);
        } else {
            res.status(404).json({ error: 'No media found for this brand' });
        }
    } catch (error) {
        console.error('Error fetching media by Brand_ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/brands/byBrand/:Brand_ID', async (req, res) => {
    try {
        const { Brand_ID } = req.params;
        const brand = await getBrandByBrandID(Brand_ID);

        if (brand.length > 0) {
            res.json(brand);
        } else {
            res.status(404).json({ error: 'No brand found for this brand' });
        }
    } catch (error) {
        console.error('Error fetching brand by Brand_ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});