import user from './user.js'
import club from './club.js'
import clubuser from './clubuser.js'
import book from './book.js';
import language from './language.js';
import category from './category.js';

export function initialiseAssociations() {

    user.hasMany(clubuser, { foreignKey: 'userId' });
    user.belongsToMany(club, { through: clubuser, foreignKey: 'userId' });

    club.hasMany(clubuser, { foreignKey: 'clubId' });
    club.belongsToMany(user, { through: clubuser ,foreignKey: 'clubId' });

    club.hasMany(book, { foreignKey: 'clubId' });
    book.belongsTo(club, { foreignKey: 'userId' });

    user.hasMany(book, { foreignKey: 'userId' });
    book.belongsTo(user, { foreignKey: 'userId' });

    language.hasMany(book, { foreignKey: 'languageId' });
    book.belongsTo(language, { foreignKey: 'languageId' });

    category.hasMany(book, { foreignKey: 'categoryId' });
    book.belongsTo(category, { foreignKey: 'categoryId' });

    clubuser.belongsTo(user, { foreignKey: 'userId' });
    clubuser.belongsTo(club, { foreignKey: 'clubId' });
}