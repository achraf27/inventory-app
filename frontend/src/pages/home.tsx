import { useNavigate } from "react-router-dom"
import landingBg from "../assets/landing.jpg"
import inventoryDraw from "../assets/inventory.png"
import functionnalityDraw from "../assets/functionnality.jpg"


export default function Home(){

    const navigate = useNavigate();

    return(
    <div>
        <div
         className="d-flex
                    flex-wrap
                    justify-content-center 
                    align-items-center" 
        
        style={{
            minHeight:"100vh",
            backgroundImage:`
            linear-gradient(
                to bottom,
                rgba(255,255,255,0) 50%,
                rgba(255,255,255,1) 100%
            ),
            url(${landingBg})
            `,
            backgroundSize:"cover",
            backgroundPosition:"center",


        }}>
           
            <div style={{padding:"4rem"}}>
                <h1 style={{
                    fontSize:"4em",
                    fontWeight:"800",
                    marginBottom: "2rem",
                    maxWidth:"800px"
                }}>
                    Logiciel de gestion d'inventaire
                </h1>

                <p style={{
                    fontSize:"1.1rem",
                    maxWidth:"60ch",
                    lineHeight: "1.8",
                }}>
                    Gérez facilement votre stock, suivez vos produits et gardez
                    une vue claire sur votre inventaire.
                </p>
                <div style ={{}}>
                    <button className="btn btn-dark me-2" onClick={()=>{navigate("/login")}}>Se connecter</button>
                    <button className="btn btn-outline-dark" onClick={()=>{navigate("/register")}}>S'inscrire</button>
                </div>
            </div>
             <img src={inventoryDraw} alt="" />
        </div>
          
                <div className="d-flex
                                flex-column 
                                justify-content-center 
                                align-items-center

                                ">

                    <h2 style={{
                        fontSize:"3em",
                        fontWeight:"800",
                        margin: "4rem",
                        
                        }}>
                        Fonctionnalités principales
                    </h2>

                    <div className="d-flex
                                flex-wrap 
                                justify-content-center 
                                align-items-center"
                          style={{
                            marginBottom:"4rem"
                          }}
                          >

                        <img src={functionnalityDraw} style={{maxWidth:"800px"}} />
                        <p style={{
                            fontWeight:"400",
                            fontSize:"1.3em",
                            maxWidth:"500px"
                        }}>
                            Le logiciel permet à l'utilisateur <strong>une gestion des 
                            produits</strong>, un <strong>suivi des quantités en temps réel
                            </strong> ainsi qu'<strong>une géstion des utilisateurs</strong> coté administrateur.
                        </p>
                        
                        </div>
                    </div>
                    
                

            
              
              <footer className="bg-light bg-gradient text-dark d-flex flex-column flex-md-row justify-content-between align-items-center p-4">
                <div>
                    © AIT DAOUD Achraf Tous droits réservés.
                </div>

                <div className="d-flex gap-3">
                    <a href="https://github.com/monprofil" className=" text-dark text-decoration-none">GitHub</a>
                    <a href="https://linkedin.com/in/monprofil" className="text-dark text-decoration-none">LinkedIn</a>
                </div>
                </footer>

        </div>
)}