import classNames from 'clsx';
import PropTypes from 'prop-types';

export default function StaticLegend(props) {
  const breaks = (props.legend && props.legend.length) || 0;

  if (breaks < 1) {
    return null;
  }

  const width = 100 / breaks;

  return (
    <div className="flex absolute w-full bottom-0 border-0 opacity-60 z-10">
      {props.legend.map((item, index) => {
        const classes = classNames('text-center font-bold white-space-nowrap overflow-hidden px-1', {
          'text-black': item.invert === true,
          'text-white': item.invert !== true,
        });

        return (
          <div
            key={index}
            className={classes}
            style={{
              backgroundColor: item.color,
              width: `${width}%`,
              maxWidth: `${width}%`,
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
StaticLegend.propTypes = {
  legend: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      invert: PropTypes.bool,
    }),
  ),
};
