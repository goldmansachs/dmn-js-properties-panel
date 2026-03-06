import {
  cleanup
} from '@testing-library/preact';

import {
  bootstrapPropertiesPanel
} from 'test/TestHelper';

import DmnPropertiesPanel from 'src/render';

import DmnPropertiesProvider from 'src/provider/dmn';

import diagramXML from './TypeRefProps.dmn';


describe('provider/dmn - TypeRefProps', function() {

  const testModules = [
    DmnPropertiesPanel,
    DmnPropertiesProvider
  ];

  afterEach(function() { return cleanup(); });

  beforeEach(bootstrapPropertiesPanel(diagramXML, {
    drd: {
      additionalModules: testModules,
      debounceInput: false
    }
  }));

  it('should parse DMN xml fixture and expose inputData/typeRef', function() {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(diagramXML, 'application/xml');

    const inputData = xmlDoc.querySelector('inputData');
    expect(inputData).to.exist;

    const variable = inputData.querySelector('variable');
    expect(variable).to.exist;
    expect(variable.getAttribute('typeRef')).to.eql('string');
  });

});