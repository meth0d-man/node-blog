const { authRegistrationController } = require('../../controllers/auth');
const User = require('../../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../model/User.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const request = {
    body: {
        username: 'fake_email',
        password: 'fake_password',
    }
};

const response = {
    status: jest.fn(() => response),
    json: jest.fn(),
    cookie: jest.fn(),
    redirect: jest.fn(),
};

it('should return status 401 if user is not found', async () => {
    User.findOne.mockResolvedValue(null);

    await authRegistrationController(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
});

it('should return status 401 if password is invalid', async () => {
    const mockUser = {
        _id: 'user_id',
        username: 'fake_email',
        password: 'fake_hashed_password',
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await authRegistrationController(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
});

it('should set a token and redirect to dashboard on valid credentials', async () => {
    const mockUser = {
        _id: 'user_id',
        username: 'fake_email',
        password: 'fake_hashed_password',
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('fake_token');

    await authRegistrationController(request, response);

    expect(jwt.sign).toHaveBeenCalledWith({ userId: 'user_id' }, expect.any(String));
    expect(response.cookie).toHaveBeenCalledWith('token', 'fake_token', { httpOnly: true });
    expect(response.redirect).toHaveBeenCalledWith('/dashboard');
});

it('should handle errors gracefully', async () => {
    const errorMessage = 'Some error occurred';
    User.findOne.mockRejectedValue(new Error(errorMessage));

    await authRegistrationController(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
});

