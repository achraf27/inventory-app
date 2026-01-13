import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar"
import { useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"


export default function ProtectedLayout(){
    const location = useLocation();

    return(
        <AnimatePresence mode="wait">
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <PageWrapper className="col-12 col-md" key={location.key}>
                            <Outlet />
                    </PageWrapper>
                </div>
            </div>
    </AnimatePresence>)
}

function PageWrapper({children}:any){
    return(

        <motion.div
            className="col p-4"
            initial={{opacity:0, y:6}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:-6}}
            transition={{duration:0.5}}>
            {children}
        </motion.div>
    )
}