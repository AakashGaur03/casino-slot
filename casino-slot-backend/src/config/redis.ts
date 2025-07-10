import Redis from "ioredis";

// ✅ Reads REDIS_URL from .env
console.log("Connecting to Redis:", process.env.REDIS_URL);

const redis = new Redis(process.env.REDIS_URL!, {
	tls: {}, // Required for Upstash HTTPS
});

export default redis;
