/*
    Mohon maap, ini aslinya untuk minggu 3 guys.
    Tapi dah kadung ketulis jadi eman kalo dihapus hehe
    Jadi hiraukan saja xD
*/

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
        /*
            Segmen kode di bawah ini menyebutkan field apa saja yang
            akan ada pada tabel database dalam bentuk objek per kolomnya.
            Tiap kolom kemudian juga dispecify tipe datanya dan atribut lainnya,
            seperti PK, nullable, autoincrement, dll.

            Beberapa properti yang umum digunakan:
            type: DataTypes.[Tipe Data]
            primaryKey: [boolean] -> menyebutkan jika kolom tsb adalah kolom PK
            allowNull: [boolean] -> defaultnya adalah true. Menyebutkan bila kolom tersebut dapat dikosongi
            autoIncrement: [boolean] -> menyebutkan jika field akan diisi dengan angka scr berurutan
            unique: [boolean]
            field: string -> apabila nama field pada DB beda dengan nama property model
            references: {
              model: Model,
              key: string
            } -> apabila suatu field merefer field milik Model lain
            defaultValue: Any -> default value untuk suatu kolom apabila kolom tsb dikosongi
        */
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        age: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    },
    /*
      Setelah menyebutkan properti model, diperlukan deklarasi opsi pembuatan tabel.
      Berikut merupakan opsi yang umum digunakan:

      modelName: string -> nama class model
      tableName: string -> nama kolom pada tabel database
      paranoid: boolean -> apabila model menggunakan sistem soft delete
      timestamps: boolean -> apabila tabel database memiliki kolom created_at dan updated_at
      createdAt: 'created_at' -> menyebutkan nama kolom created_at pada tabel
      updatedAt: 'updated_at' -> menyebutkan nama kolom updated_at pada tabel
      deletedAt: 'deleted_at' -> menyebutkan nama kolom deleted_at pada tabel

      Bagi yang belum tahu, [created, updated, deleted]_at merupakan sebuah sistem
      di mana tabel pada database memiliki kolom dengan nama [created, updated, deleted]_at.
      Sistem ini sangat umum diterapkan oleh berbagai developer.
      Field created_at secara otomatis akan terisi datetime ketika sebuah data baru dibuat pada tabel
      agar admin tahu kapan data tsb dibuat.
      Field updated_at secara otomatis akan terupdate Datetime ketika terdapat row pada database yang 
      mengalami perubahan data. Hal ini agar admin tahu kapan suatu perubahan data terjadi.
      Field deleted_at, apabila terdapat tabel dengan kolom ini berarti tabel tersebut menerapkan
      sistem 'soft delete'. Soft delete merupakan sistem di mana data yang dihapus sebenarnya
      tidak beneran dihapus. Kolom deleted_at akan diisi Datetime waktu user "menghapus" data tersebut.
      Sehingga row di mana deleted_at tidak kosong tidak akan ditampilkan pada user.
    */
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  );
  return Buku;
};

/*
  Beberapa tipe data yang umum digunakan:
  STRING
  STRING(50) -> String dengan jumlah karakter maksimal 50
  TEXT
  DECIMAL
  DECIMAL(5,2)
  DATE
  DATEONLY
  BOOLEAN
*/
