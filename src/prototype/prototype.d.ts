// Tipe modul "prototype:variants" (lihat ./integration.mjs). Saat build isinya objek kosong.
declare module "prototype:variants" {
  const prototypeVariants: Record<string, Record<string, { default: any }>>;
  export default prototypeVariants;
}
