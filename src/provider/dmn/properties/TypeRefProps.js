import {
  getBusinessObject
} from 'dmn-js-shared/lib/util/ModelUtil';

import { SelectEntry, isSelectEntryEdited } from '@bpmn-io/properties-panel';

import {
  useService
} from '../../../hooks';

/**
 * @typedef { import('@bpmn-io/properties-panel').EntryDefinition } Entry
 */

/**
 * @returns {Array<Entry>} entries
 */
export function TypeRefProps(props) {
  const {
    element
  } = props;

  return [
    {
      id: 'typeRef',
      component: TypeRef,
      element,
      isEdited: isSelectEntryEdited
    }
  ];
}

function TypeRef(props) {
  const {
    element,
    id
  } = props;

  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');

  const businessObject = getBusinessObject(element);
  const currentType = (businessObject.variable && businessObject.variable.typeRef) || businessObject.typeRef || 'Any';

  const getValue = () => currentType;

  const setValue = (value) => {
    if (businessObject.variable) {
      modeling.updateProperties(element, {
        variable: {
          ...businessObject.variable,
          typeRef: value
        }
      });
    } else {
      modeling.updateProperties(element, {
        typeRef: value
      });
    }
  };
  const DEFAULT_DATA_TYPES = [ 'string', 'boolean', 'integer', 'number', 'date', 'time', 'dateTime', 'dayTimeDuration', 'yearMonthDuration', 'any' ];
  const getOptions = () => {
    return DEFAULT_DATA_TYPES.map(type => ({
      value: type,
      label: type
    }));
  };

  return SelectEntry({
    element,
    id,
    label: translate('Type'),
    getValue,
    setValue,
    getOptions,
    debounce
  });
}