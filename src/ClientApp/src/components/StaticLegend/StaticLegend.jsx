import classNames from 'clsx';
import './StaticLegend.css';

export default function StaticLegend(props) {
  const breaks = (props.legend && props.legend.length) || 0;

  if (breaks < 1) {
    return null;
  }

  const width = 100 / breaks;

  return (
    <div className="static-legend" style={props.style}>
      {props.legend.map((item, index) => {
        const classes = classNames('static-legend__item', { 'static-legend__item--invert': item.invert === true });

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
