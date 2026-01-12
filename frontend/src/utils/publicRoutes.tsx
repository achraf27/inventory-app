import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/auth.service"; 
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PublicRoutes(){
  const token = getToken();
  const location = useLocation();
    
  if (token) return <Navigate to="/dashboard" replace />;

  return (
     <AnimatePresence mode="wait" initial={false}>
      <PageWrapper key ={location.pathname}>
        <Outlet />
      </PageWrapper>
  </AnimatePresence>
);

}

function PageWrapper({children}:any){
    return(

        <motion.div
            
            style={{ overflow: "hidden", minHeight: "100vh"  }}
            initial={{y:1}}
            animate={{y:0}}
            exit={{y:1}}
            transition={{duration:0.2,ease:easeInOut}}>
            {children}
        </motion.div>
    )
}