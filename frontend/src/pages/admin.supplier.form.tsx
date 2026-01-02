import { useState } from "react";
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { createSupplier, getOneSupplier, updateSupplier } from "../services/supplier.service";

export default function AdminSupplierForm(){
    const {supplier_id} = useParams<{supplier_id:string}>();

    const isEditMode = !!supplier_id;

    const [contactName,setContactName] = useState<string>("");
    const [mail,setMail] = useState<string>("");
    const [phone,setPhone] = useState<string>("");
    const [address,setAddress] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(){
        try{
            console.log({ contactName, mail, phone, address });

            if (!contactName || !mail || !phone || !address) {
                setError("Tous les champs obligatoires doivent être remplis");
                return;
                } 

            if(isEditMode && supplier_id){
               const res = await updateSupplier(Number(supplier_id),{contact_name:contactName,mail,phone,address})
               setMessage(res.message);
            
            }else{
                const res = await createSupplier({contact_name:contactName,mail,phone,address});
                setMessage(res.message);
            }
        }
        catch(err:any){
            console.log(err);
            console.log(contactName + mail +phone + address);
             console.error("Erreur lors de la soumission du formulaire:", err);
            if (err.response) {
                setError(`Erreur ${err.response.data?.message}`);
            } else {
                setError(err.message || "Erreur inconnue");
            }
        }
    }

    useEffect(()=>{
        if(!supplier_id) return;

        async function loadUser(){
            try{
                const supplierDto = await getOneSupplier(Number(supplier_id))
                setContactName(supplierDto.supplier.contact_name);
                setMail(supplierDto.supplier.mail);
                setPhone(supplierDto.supplier.phone)
                setAddress(supplierDto.supplier.address)
            }catch(err:any){
                setError("Impossible de charger le fournisseur en mode edition.")
            }
        }
        loadUser();
    },[supplier_id]);

    return(<>
    <h1>{isEditMode? "Modifier le fournisseur":"Ajouter un fournisseur"}</h1>

     {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
     {message && <div style={{ color: "green", marginBottom: "1rem" }}>{message}</div>}

    <form onSubmit={async (e)=> {e.preventDefault() 
                           await handleSubmit()
                            }}>
        <input
        onChange={(e) => setContactName(e.target.value)}
        value={contactName}
          placeholder="Nom de contact"
          type="text"
        />
        <input
        onChange={(e) => setMail(e.target.value)}
        value={mail}
          placeholder="Mail"
          type="email"
        />
      
        <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            placeholder="Numéro de telephone"
            type="tel"
        />

         <input
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="Addresse"
            type="text"
        />
        
        
        <input type="submit" value={isEditMode ? "Mettre à jour" : "Créer"} />
      </form>

    </>)
}