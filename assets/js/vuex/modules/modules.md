<b>The following methods should be either in mutations to commit or in actions to dispatch</b>

**init**

<p>This method invokes when the app get initialized.</p>

**requestInterceptor**

<p>This method is invoked before sending a server request.</p>
<p>This method received config which are free to modify.<br>
Once modified, it should commit by calling updateConfig mutation in root</p>
<p>Ex: commit('updateConfig',config,{ root:true });</p>

**responseInterceptor**

<p>This method is invoked just after the response received, before it get handled.</p>
<p>This method received response data which are free to modify.<br>
Once modified, it should commit by calling updateResponse mutation in root</p>
<p>Ex: commit('updateResponse',response,{ root:true });</p>

**beforeEachRoute**

<p>This method is invoked just after the response received, before it get handled.</p>
<p>This method received payload with properties to,from,next.</p>
<p>Once done, must commit proceedRoute in root</p>
<p>Ex: commit('proceedRoute',null,{ root:true });</p>
