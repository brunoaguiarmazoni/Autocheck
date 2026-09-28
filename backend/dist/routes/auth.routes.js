"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const authMiddleware_js_1 = require("../middlewares/authMiddleware.js");
const router = (0, express_1.Router)();
router.post('/register', (req, res) => auth_controller_js_1.authController.register(req, res));
router.post('/login', (req, res) => auth_controller_js_1.authController.login(req, res));
// Mock protected route for middleware validation tests
router.get('/me', authMiddleware_js_1.authMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
});
exports.default = router;
