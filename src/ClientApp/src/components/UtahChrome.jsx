import { loadHeader, removeHeader, setUtahHeaderSettings } from '@utahdts/utah-design-system-header';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const links = (version) => [
  {
    title: 'Corrections Homepage',
    actionUrl: { url: 'https://corrections.utah.gov/' },
  },
  {
    title: 'GitHub Repository',
    actionUrl: { url: 'https://github.com/agrc/parole-and-probation' },
  },
  {
    title: `Version ${version} changelog`,
    actionUrl: { url: `https://github.com/agrc/parole-and-probation/releases/v${version}` },
  },
  {
    title: 'Third-party notices',
    actionUrl: { url: '/ThirdPartyNotices.txt' },
  },
];

export default function UtahChrome({ version }) {
  useEffect(() => {
    setUtahHeaderSettings({
      applicationType: 'custom application',
      title: 'AP&P field map',
      titleUrl: '/',
      skipLinkUrl: '#main-content',
      showTitle: true,
      size: 'MEDIUM',
      mainMenu: false,
      utahId: false,
      notifications: false,
      onSearch: false,
      logo: {
        imageUrl: '/udc-logo.webp',
      },
      domLocationTarget: {
        cssSelector: '#utah-header-target',
      },
      actionItems: [
        {
          title: 'Links',
          showTitle: false,
          icon: '<span class="utds-icon-before-waffle" aria-hidden="true" />',
          actionPopupMenu: {
            title: 'AP&P field map links',
            menuItems: links(version),
          },
        },
      ],
      footer: {
        showHorizontalRule: false,
        domLocationTarget: {
          cssSelector: '#utah-footer-target',
        },
      },
    });
    loadHeader();

    return () => removeHeader(true);
  }, [version]);

  return null;
}

UtahChrome.propTypes = {
  version: PropTypes.string.isRequired,
};
