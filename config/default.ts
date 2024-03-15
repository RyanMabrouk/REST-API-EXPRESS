export default {
  port: 1337,
  dbUri: `mongodb+srv://mabroukr999:${process.env.MONGO_DB_PASSWORD}@cluster0.pnjs4wc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  saltWorkFactor: 10,
  accessTokenTtl: "1h",
  refreshTokenTtl: "1y",
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,
};
