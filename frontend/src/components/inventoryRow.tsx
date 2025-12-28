import { useState } from "react";
import type { InventoryArticleDTO } from "../utils/types";

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
      <td>
        <button onClick={async () => onDelete(article.article_id)}>Supprimer</button>
        {isEditing ? (
          <>
            <button onClick={handleSave}>Enregistrer</button>
            <button onClick={() => setIsEditing(false)}>Annuler</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Modifier la quantité</button>
        )}
      </td>
    </tr>
  );
}
