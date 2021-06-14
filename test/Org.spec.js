import { mount } from '@vue/test-utils'
import Org from '~/components/Org.vue'

const props = {
  asamblea: {
    assembly_id: 1,
    assembly_label: 'Asamblea Test',
    organization_name: 'Org Test'
  },    
  title: 'titulo',
  icon: 'star'
}

describe('Org', () => {
  const wrapper = mount(Org, {propsData: props })
  it('is instantiated', () => {
    expect(wrapper.vm).toBeTruthy();
  });  
})
