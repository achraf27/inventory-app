import { useState } from "react";
import type { InventoryArticleDTO } from "../../utils/types";

type Props = {
  article: InventoryArticleDTO;
  onDelete: (id: number) => void;
  onUpdateQuantity: (id: number, newQuantity: string) => Promise<void>;
};

export default function InventoryRow({ article, onDelete, onUpdateQuantity }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(article.quantity);

  const handleSave = async () => {
    await onUpdateQuantity(article.article_id, String(quantity));
    setIsEditing(false);
  };

  function formatDate(date:string|Date|undefined){
    if(!date) return'-';
    return new Date(date).toLocaleDateString('fr-FR');
  }

  return (
    <tr key={`${article.user_id}-${article.article_id}`}>
      <td>{article.name}</td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ width: "60px" }}
          />
        ) : (
          article.quantity
        )}
      </td>
      <td>{article.unit}</td>
      <td>{formatDate(article.addedAt)}</td>

      <td>

        

       
        {isEditing ? (
          <>
            <td>
              <button
                    className="btn btn-dark"
                    onClick={handleSave}>Enregistrer
              </button>
             </td>
            <td>
              <button
                className="btn btn-danger" 
                onClick={() => setIsEditing(false)}>Annuler
              </button>
            </td>
          </>
        ) : (
          <td>
            <button 
                    className="btn btn-dark"
                    onClick={() => setIsEditing(true)}>Modifier la quantité
            </button>
          </td>
        )}
         <button 
                className="btn btn-outline-danger"
                onClick={async () => onDelete(article.article_id)}>Supprimer
          </button>
        </td>
      
    </tr>
  );
}
