export function formatDate(val: any) {
  console.log(val);
  
  if (!val) return "nil";
  return new Date(val).toISOString();
}
