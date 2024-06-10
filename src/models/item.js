import { DataTypes } from'sequelize';

export default (sequelize) => {
    sequelize.define("Item", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          text: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
        deleteAt:{
          type: DataTypes.BOOLEAN,
          defaultValue:false
      } 
    });
};
