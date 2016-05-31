
export default function functor (f) {
  return typeof f === 'function' ? f : function() { return f }
}
