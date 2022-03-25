import winston from "winston";
import "winston-mongodb";

export default (): void => {
  winston.add(
    new winston.transports.File({
      filename: "exAndRejLogger.log",
      handleExceptions: true,
      handleRejections: true,
      level: "error",
    })
  );

  winston.add(new winston.transports.File({ filename: "logFile.log" }));

  winston.add(
    new winston.transports.MongoDB({
      level: "error",
      db: process.env.MONGO_URI,
      options: {
        useUnifiedTopology: true,
      },
    })
  );
};
