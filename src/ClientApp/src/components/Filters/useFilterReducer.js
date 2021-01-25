const shape = (props, type, name) => [
  props.criteria[name],
  (event) =>
    props.update({
      type,
      payload: event.target.value,
      meta: name,
    }),
];

export default shape;
