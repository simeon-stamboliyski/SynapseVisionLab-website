module.exports = (sequelize, DataTypes) => {
    const Download = sequelize.define("download", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        platform: {
            type: DataTypes.ENUM('windows', 'macos'),
            allowNull: false,
            unique: true
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        file_url: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Path or URL to the downloadable file'
        },
        version: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '1.0.0'
        },
        size_mb: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        release_notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        download_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Download;
};