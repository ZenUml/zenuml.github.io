<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <menu-entry>
      <icon-help-circle slot="icon"></icon-help-circle>

      <div class="h3-section prism">
        <h3>Starter</h3>
        <div class="body">
          <pre class="javascript-highlighting" v-html="starter"></pre>
        </div>
      </div>
    </menu-entry>
    <menu-entry>
      <icon-help-circle slot="icon"></icon-help-circle>

      <div class="h3-section prism">
        <h3>Single</h3>
        <div class="body">
          <pre class="javascript-highlighting" v-html="singleMessage"></pre>
        </div>
      </div>
    </menu-entry>
    <menu-entry>
      <icon-help-circle slot="icon"></icon-help-circle>

      <div class="h3-section prism">
        <h3>Result</h3>
        <div class="body">
          <pre class="javascript-highlighting" v-html="resultMessage"></pre>
        </div>
      </div>
    </menu-entry>
    <menu-entry>
      <icon-help-circle slot="icon"></icon-help-circle>

      <div class="h3-section prism">
        <h3>Nested</h3>
        <div class="body">
          <pre class="javascript-highlighting" v-html="nestedMessage"></pre>
        </div>
      </div>
    </menu-entry>
    <menu-entry>
      <icon-help-circle slot="icon"></icon-help-circle>

      <div class="h3-section prism">
        <h3>Self</h3>
        <div class="body">
          <pre class="javascript-highlighting" v-html="selfMessage"></pre>
        </div>
      </div>
    </menu-entry>
    <menu-entry>
      <icon-help-circle slot="icon"></icon-help-circle>

      <div class="h3-section prism">
        <h3>Alt</h3>
        <div class="body">
          <pre class="javascript-highlighting" v-html="altMessage"></pre>
        </div>
      </div>
    </menu-entry>
    <menu-entry>
      <icon-help-circle slot="icon"></icon-help-circle>

      <div class="h3-section prism">
        <h3>Loop</h3>
        <div class="body">
          <pre class="javascript-highlighting" v-html="loopMessage"></pre>
        </div>
      </div>
    </menu-entry>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Prism from 'prismjs';
import MenuEntry from './common/MenuEntry';
import UserImage from '../UserImage';
import googleHelper from '../../services/providers/helpers/googleHelper';
import syncSvc from '../../services/syncSvc';
import providerUtils from '../../services/providers/providerUtils';

export default {
  components: {
    MenuEntry,
    UserImage,
  },
  computed: {
    ...mapGetters('data', [
      'loginToken',
    ]),
    starter() {
      return Prism.highlight('@Starter(User)\nA.methodA(p1, p2)', Prism.languages.javascript);
    },
    singleMessage() {
      return Prism.highlight('A.methodA(p1, p2)', Prism.languages.javascript);
    },
    resultMessage() {
      return Prism.highlight('TYPE result = A.methodA()', Prism.languages.javascript);
    },
    nestedMessage() {
      return Prism.highlight('A.methodA(p1, p2) {\n B.methodB(p3) \n}', Prism.languages.javascript);
    },
    selfMessage() {
      return Prism.highlight('internalMethod(p1, p2)', Prism.languages.javascript);
    },
    altMessage() {
      return Prism.highlight('if (condition1) {\n' +
        '  A.methodA()\n' +
        '} else (condition2) {\n' +
        '  B.methodB()\n' +
        '} else {\n' +
        '  C.methodC()\n' +
        '}', Prism.languages.javascript);
    },
    loopMessage() {
      return Prism.highlight('while(condition) {\n' +
        '  A.methodA()\n' +
        '}', Prism.languages.javascript);
    },
  },
  methods: {
    ...mapActions('data', {
      setPanel: 'setSideBarPanel',
    }),
    signin() {
      return googleHelper.signin()
        .then(
          () => syncSvc.requestSync(),
          () => {}, // Cancel
        );
    },
    onImportFile(evt) {
      const file = evt.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          if (content.match(/\uFFFD/)) {
            this.$store.dispatch('notification/error', 'File is not readable.');
          } else {
            this.$store.dispatch('createFile', {
              ...providerUtils.parseContent(content),
              name: file.name,
            })
              .then(item => this.$store.commit('file/setCurrentId', item.id));
          }
        };
        reader.readAsText(file);
      }
    },
    fileProperties() {
      return this.$store.dispatch('modal/open', 'fileProperties')
        .catch(() => {}); // Cancel
    },
    print() {
      print();
    },
  },
};
</script>



<style lang="scss" scoped>

pre {
  margin: 0;
}

.h3-section > h3 {
  margin-top: 8px;
  margin-bottom: 16px;
  white-space: nowrap;
  overflow: hidden;
  font-weight: normal;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", sans-se, serif;
}

.h3-section > h3::after {
  margin-left: 24px;
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, rgba(116, 95, 181, 0.2), transparent 80%);
}

.h3-section > .body {
  text-align: left;
  background: white;
  box-shadow: 0 6px 8px rgba(102, 119, 136, 0.03), 0 1px 2px rgba(102, 119, 136, 0.3);
}

.h3-section > .body > pre {
  margin: 0;
  padding: 16px;
}

</style>
