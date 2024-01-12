'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
     'Clients', //name of Source model
     'productId', //name of the key we´re adding
     {
      type: Sequelize.INTEGER,
      references: {
        model: 'Products', //name od target model
        key: 'id', // key in Target model that we´re referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
     } 
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Clients', //name of Source model
      'productId', //name of the key we´re adding
    )
  }
};;
