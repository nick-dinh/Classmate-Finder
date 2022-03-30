module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    //associating a table to another, a user can have multiple posts
    // Users.associate = (models) => {
  //   Users.hasMany(models.Posts, {
  //     onDelete: "cascade",
  //   });
  // };
    return Users;
}