import '@arcgis/map-components/components/arcgis-expand';
import PropTypes from 'prop-types';

export default function MapToolPanel(props) {
  return (
    <arcgis-expand
      slot={props.slot}
      className={props.className}
      expanded={props.expanded}
      expandIcon="map-pin"
      expandTooltip="Zoom to address"
      collapseTooltip="Close address search"
      group={props.group}
      mode="floating"
    >
      <form className="map-tool-panel p-2" autoComplete="new-password">
        {props.children}
      </form>
    </arcgis-expand>
  );
}
MapToolPanel.propTypes = {
  slot: PropTypes.string,
  expanded: PropTypes.bool,
  group: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
