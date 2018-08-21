**init**

This method invokes when the app get initialized.

This should be either in mutations to commit or in actions to dispatch

**requestInterceptor**

This method is invoked before sending a server request .
This method received config which are free to modify.
Once modified, it should commit by calling updateConfig mutation in root
Ex: commit('updateConfig',config,{ root:true });