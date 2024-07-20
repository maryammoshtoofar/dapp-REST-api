
const HealthCheck = async () => {
    const result = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    return { result };
};

module.exports = {HealthCheck}