import Express from 'express'
import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

const app = Express.Router() 

//Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where:{
                email: req.body.email
            }
        })

        if (user.getPasswordEncrypt() === req.body.password) {
            const token = jwt.sign({ id: user.id }, '3de113c0-757c-45be-a5ab-238221699cd2', {
                expiresIn: '2h' // expires in 2 hours
        })

            res.send({ token, user: { ...user.dataValues } })
                
        } else {
            res.status(400).send('Credenciales incorrectas')
        }

    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error)
        res.status(500).send('Error interno del servidor')
    }
    
})

// Ruta para el registro de usuarios
app.post('/signup', async (req, res) => {
    try {
      const existingUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (existingUser) {
        return res.status(400).send('El usuario ya existe');
      }
  
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, // Asegúrate de agregar lógica de hash aquí
        role: req.body.role || 'ADMIN',
      });
  
      const token = jwt.sign({ id: newUser.id }, '3de113c0-757c-45be-a5ab-238221699cd2', {
        expiresIn: '2h',
      });
  
      res.status(201).send({ token, user: { ...newUser.dataValues } });
  
    } catch (error) {
      console.error('Error al intentar registrar usuario:', error);
      res.status(500).send('Error interno del servidor');
    }
});
  
export default app; 