import user from './user.js'
import club from './club.js'
import clubuser from './clubuser.js'

export function initialiseAssociations() {

    user.hasMany(clubuser, { foreignKey: 'userId' });
    user.belongsToMany(club, { through: clubuser, foreignKey: 'userId' });

    club.hasMany(clubuser, { foreignKey: 'clubId' });
    club.belongsToMany(user, { through: clubuser ,foreignKey: 'userId' });

    clubuser.belongsTo(user, { foreignKey: 'userId' });
    clubuser.belongsTo(club, { foreignKey: 'clubId' });

}