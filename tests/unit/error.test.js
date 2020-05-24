import { mount, RouterLinkStub } from '@vue/test-utils'
import Error from '@/layouts/error.vue'

describe('Error Page', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Error, {
      propsData: {
        error: {
          statusCode: 404
        }
      },
      stubs: {
        "NuxtLink": RouterLinkStub
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
