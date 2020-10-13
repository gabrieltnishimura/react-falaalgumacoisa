export interface RegionSelectorModel {
  value: string;
  label: string;
  dialects: DialectSelectorModel[];
}

export interface DialectSelectorModel {
  value: string;
  label: string;
}

const getRegionDropdown = (): RegionSelectorModel[] => {
  return [{
    value: 'NO',
    label: 'Norte',
    dialects: [{
      label: 'Nortista',
      value: 'Nortista',
    }, {
      label: 'Serra amazônica',
      value: 'Serra amazônica',
    }]
  }, {
    value: 'ND',
    label: 'Nordeste',
    dialects: [{
      label: 'Costa norte',
      value: 'Costa norte',
    }, {
      label: 'Nordestino',
      value: 'Nordestino',
    }, {
      label: 'Recifense',
      value: 'Recifense',
    }, {
      label: 'Baiano',
      value: 'Baiano',
    }]
  }, {
    value: 'CO',
    label: 'Centro-Oeste',
    dialects: [{
      label: 'Sertanejo',
      value: 'Sertanejo',
    }, {
      label: 'Brasiliense',
      value: 'Brasiliense',
    }]
  }, {
    value: 'SD',
    label: 'Sudeste',
    dialects: [{
      label: 'Mineiro',
      value: 'Mineiro',
    }, {
      label: 'Caipira',
      value: 'Caipira',
    }, {
      label: 'Fluminense',
      value: 'Fluminense',
    }, {
      label: 'Carioca',
      value: 'Carioca',
    }, {
      label: 'Paulistano',
      value: 'Paulistano',
    }]
  }, {
    value: 'SU',
    label: 'Sul',
    dialects: [{
      label: 'Sulista',
      value: 'Sulista',
    }, {
      label: 'Florianopolitano',
      value: 'Florianopolitano',
    }, {
      label: 'Gaúcho',
      value: 'Gaúcho',
    }]
  }];
}

export {
  getRegionDropdown,
};

