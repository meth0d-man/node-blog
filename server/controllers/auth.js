async function authRegistrationController(req, res) {
        try {
        const { username, password } = req.body;
        const user = await User.findOne( { username } );
    
        if(!user) {
            return res.status(401).json( { message: 'Invalid credentials' } );
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if(!isPasswordValid) {
            return res.status(401).json( { message: 'Invalid credentials' } );
        }
    
        const token = jwt.sign({ userId: user._id}, jwtSecret );
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    
        } catch (error) {
        console.log(error);
        return res.status(401).json( { message: 'Invalid credentials' } );
        }
  };

  module.exports = { authRegistrationController }