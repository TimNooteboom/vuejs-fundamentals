export default function (amt) {
  return amt.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
