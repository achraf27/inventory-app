/**
 * DTO représentant un fournisseur.
 */
export type SupplierDto = {
  /** Identifiant du fournisseur */
  id: number;
  /** Nom du contact du fournisseur */
  contact_name: string;
  /** Email du fournisseur */
  mail: string;
  /** Téléphone du fournisseur */
  phone: string;
  /** Adresse du fournisseur */
  address: string;
};

/**
 * Classe représentant un fournisseur.
 */
export class Supplier {
  /** Identifiant du fournisseur (lecture seule après création) */
  id: number = -1;

  /** Nom du contact du fournisseur */
  readonly contact_name: string;

  /** Email du fournisseur */
  readonly mail: string;

  /** Téléphone du fournisseur */
  readonly phone: string;

  /** Adresse du fournisseur */
  readonly address: string;

  /**
   * Crée une instance de Supplier.
   *
   * @param contact_name - Nom du contact
   * @param mail - Email
   * @param phone - Téléphone
   * @param address - Adresse
   * @param id - Identifiant optionnel (attribué si déjà connu)
   */
  constructor(contact_name: string, mail: string, phone: string, address: string, id?: number) {
    this.contact_name = contact_name;
    this.mail = mail;
    this.phone = phone;
    this.address = address;
    if (id) this.id = id;
  }

  /**
   * Transforme le fournisseur en DTO sérialisable.
   *
   * @returns SupplierDto - Objet contenant id, contact_name, mail, phone et address
   */
  toDto(): SupplierDto {
    return {
      id: this.id,
      contact_name: this.contact_name,
      mail: this.mail,
      phone: this.phone,
      address: this.address,
    };
  }
}
