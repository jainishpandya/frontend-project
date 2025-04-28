import user from './user.js'
import club from './club.js'
import clubuser from './clubuser.js'
import book from './book.js';
import language from './language.js';
import category from './category.js';
import transaction from './transaction.js';
import location from './location.js';
export function initialiseAssociations() {

    // user.hasMany(clubuser, { foreignKey: 'userId' });
    // user.belongsToMany(club, { through: clubuser, foreignKey: 'userId' });
    // user.hasMany(book, { foreignKey: 'userId' })


    // club.hasMany(clubuser, { foreignKey: 'clubId' });
    // club.belongsToMany(user, { through: clubuser, foreignKey: 'clubId' });
    // club.hasMany(book, { foreignKey: 'clubId' });

    // club.hasMany(book, { foreignKey: 'clubId' });
    // book.belongsTo(club, { foreignKey: 'userId' });

    // user.hasMany(book, { foreignKey: 'userId' });
    // book.belongsTo(user, { foreignKey: 'userId' });

    // language.hasMany(book, { foreignKey: 'languageId' });
    // book.belongsTo(language, { foreignKey: 'languageId' });

    // category.hasMany(book, { foreignKey: 'categoryId' });
    // book.belongsTo(category, { foreignKey: 'categoryId' });

    // clubuser.belongsTo(user, { foreignKey: 'userId' });
    // clubuser.belongsTo(club, { foreignKey: 'clubId' });

    // book.belongsTo(user, { foreignKey: 'userId' });
    // book.belongsTo(club, { foreignKey: 'clubId' });

    // User associations
    user.hasMany(clubuser, { foreignKey: 'userId' });
    user.belongsToMany(club, { through: clubuser, foreignKey: 'userId' });
    user.hasMany(book, { foreignKey: 'userId' });
    user.hasMany(transaction, { foreignKey: 'LenderId' });
    user.hasMany(transaction, { foreignKey: 'BorrowerId' });

    // Club associations
    club.hasMany(clubuser, { foreignKey: 'clubId' });
    club.belongsToMany(user, { through: clubuser, foreignKey: 'clubId' });
    club.hasMany(book, { foreignKey: 'clubId' });
    club.hasMany(transaction, { foreignKey: 'clubId' });

    club.hasMany(location, { foreignKey: 'clubId' });


    book.hasMany(transaction, { foreignKey: 'bookId' });

    // Book associations
    book.belongsTo(club, { foreignKey: 'clubId' });
    book.belongsTo(user, { foreignKey: 'userId' });
    book.belongsTo(language, { foreignKey: 'languageId' });
    book.belongsTo(category, { foreignKey: 'categoryId' });

    // Language associations
    language.hasMany(book, { foreignKey: 'languageId' });

    // Category associations
    category.hasMany(book, { foreignKey: 'categoryId' });

    // Clubuser associations
    clubuser.belongsTo(user, { foreignKey: 'userId' });
    clubuser.belongsTo(club, { foreignKey: 'clubId' });

    transaction.belongsTo(user, { foreignKey: 'LenderId' });
    transaction.belongsTo(user, { foreignKey: 'BorrowerId' });
    transaction.belongsTo(book, { foreignKey: 'bookId' });
    transaction.belongsTo(club, { foreignKey: 'clubId' });

    location.belongsTo(club, { foreignKey: 'clubId' });
}