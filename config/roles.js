const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("basic")
 .readOwn("profile")
 .updateOwn("profile")
 
ac.grant("supervisor")
 .extend("basic")
 .readAny("profile")
 .readAny("user")
 
 
ac.grant("admin")
 .extend("basic")
 .extend("supervisor")
 .updateAny("profile")
 .deleteAny("profile")
 .createAny("user")
 .deleteAny("user")
 .updateAny("user")
 

 ac.grant("Admin")
 .extend("basic")
 .extend("supervisor")
 .extend("admin")


 
return ac;
})();
