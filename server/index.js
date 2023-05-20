require("dotenv").config();

import express from "express"
import session from "express-session";
import cors from "cors"
import helmet from "helmet"
import passport from "passport"


//API
import Auth from "./API/Auth"
import Restaurant from "./API/Restaurant"
import Food from "./API/food"
import Menu from "./API/menu"
import Image from "./API/image"
import Order from "./API/orders"
import Reviews from "./API/reviews"


//config
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config"

//Database connection
import ConnectDB from "./database/connection";

const foodpanda = express();


foodpanda.use(express.json());
foodpanda.use(express.urlencoded({extended:false}));
// Add express-session middleware
foodpanda.use(session({
    secret: "mykey",
    resave: true,
    saveUninitialized: true
  }));  
foodpanda.use(cors());
foodpanda.use(helmet());
foodpanda.use(passport.initialize());
foodpanda.use(passport.session());

//passport configuration
googleAuthConfig(passport);
routeConfig(passport)

//for application routes
//localhost/auth/signup
foodpanda.use('/auth',Auth);
foodpanda.use('/restaurant',Restaurant);
foodpanda.use('/food',Food);
foodpanda.use('/menu',Menu);
foodpanda.use('/image',Image);
foodpanda.use('/order',Order);
foodpanda.use('/reviews',Reviews);


foodpanda.get('/',(req,res) => res.json({message:"Setup Successfull"}))


foodpanda.listen(4000,() => ConnectDB().then(() => console.log("Connection Established to Database")).catch(() => console.log("DB connection failed")))