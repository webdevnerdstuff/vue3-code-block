<template>
	<div>
		<div class="row mb-2">
			<div class="col-12">
				<h5>Tabs</h5>
			</div>
		</div>

		<!-- ======================= Copy Code Tab -->
		<div id="tab-copy-example" class="row mb-4">
			<div class="col-12">
				<CodeBlock
					:code="examples[selectedLibrary.id].copy"
					copy-tab
					:highlightjs="selectedLibrary.id === 'highlightjs'"
					label="Copy Code Tab"
					lang="html"
					:prismjs="selectedLibrary.id === 'prism'"
					:run-tab="false"
					tabs
					:theme="selectedTheme"
				/>
			</div>
		</div>

		<!-- ======================= Run Code Tab -->
		<div id="tab-run-example" class="row mb-4">
			<div class="col-12">
				<CodeBlock
					:code="examples[selectedLibrary.id].run"
					:copy-tab="false"
					:highlightjs="selectedLibrary.id === 'highlightjs'"
					label="Run Code Tab"
					lang="html"
					:max-height="codeBlockOptions.preHeight"
					:prismjs="selectedLibrary.id === 'prism'"
					run-tab
					tabs
					:theme="selectedTheme"
					@run="runMyCodeFunction"
				/>
			</div>
		</div>

		<!-- ======================= Both Tabs -->
		<div id="tab-both-example" class="row mb-4">
			<div class="col-12">
				<CodeBlock
					:code="examples[selectedLibrary.id].both"
					:highlightjs="selectedLibrary.id === 'highlightjs'"
					label="Copy &amp; Run Code Tabs"
					lang="html"
					:max-height="codeBlockOptions.preHeight"
					:prismjs="selectedLibrary.id === 'prism'"
					:run-tab="true"
					tabs
					:theme="selectedTheme"
					@run="runMyOtherCodeFunction"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { inject } from 'vue';

const codeBlockOptions = inject('codeBlockOptions');
const selectedLibrary = inject('selectedLibrary');
const selectedTheme = inject('selectedTheme');

const examples = {
	prism: {
		copy: `<CodeBlock
  :code="myCode"
  copy-tab
  label="Copy Code Tab"
  lang="javascript"
  prismjs
  :run-tab="false"
  tabs
/>`,
		run: `<template>
  <CodeBlock
    :code="myCode"
    :copy-tab="false"
    label="Run Code Tab"
    lang="javascript"
    prismjs
    run-tab
    tabs
    @run="runMyCodeFunction"
  />
<\/template>

<script setup>
  function runMyCodeFunction() {
    const message = 'Run Code Tab';
    alert(message);
  }
<\/script>`,
		both: `<template>
  <CodeBlock
    :code="myCode"
    label="Copy &amp; Run Code Tabs"
    lang="javascript"
    prismjs
    :run-tab="true"
    tabs
    @run="runMyOtherCodeFunction"
  />
<\/template>

<script setup>
  function runMyCodeFunction() {
    const message = 'bar';
    alert(message);
  }
<\/script>`,
	},
	highlightjs: {
		copy: `<CodeBlock
  :code="myCode"
  copy-tab
  highlightjs
  label="Copy Code Tab"
  lang="javascript"
  :run-tab="false"
  tabs
/>`,
		run: `<template>
  <CodeBlock
    :code="myCode"
    :copy-tab="false"
    highlightjs
    label="Run Code Tab"
    lang="javascript"
    run-tab
    tabs
    @run="runMyCodeFunction"
  />
<\/template>

<script setup>
  function runMyCodeFunction() {
    const message = 'Run Code Tab';
    alert(message);
  }
<\/script>`,
		both: `<template>
  <CodeBlock
    :code="myCode"
    highlightjs
    label="Copy &amp; Run Code Tabs"
    lang="javascript"
    :run-tab="true"
    tabs
    @run="runMyOtherCodeFunction"
  />
<\/template>

<script setup>
  function runMyCodeFunction() {
    const message = 'bar';
    alert(message);
  }
<\/script>`,
	}
};

function runMyCodeFunction() {
	const message = 'Run Code Tab';
	alert(message);
}

function runMyOtherCodeFunction() {
	const message = 'Copy & Run Code Tabs';
	alert(message);
}


</script>
