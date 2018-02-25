export default function interval(childInterval) {
  if (
    typeof childInterval !== 'object' ||
    typeof childInterval.run !== 'function' ||
    typeof childInterval.ms !== 'number'
  )
    throw new Error(
      'Must provided an object with a `run` callback and `ms` number'
    );
  if (childInterval.ms < 0) throw new Error('ms must be a positive number');

  return function DecoratedInterval() {
    let id;

    this.start = () => {
      id = setInterval(childInterval.run, childInterval.ms);
    };

    this.end = () => {
      if (id) {
        clearInterval(id);
        id = undefined;
      }
    };
  };
}