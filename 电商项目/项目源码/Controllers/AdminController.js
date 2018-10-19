module.exports = {
    ad_index: function (req, res) {
        res.render('admin/index', {});
    },
    admin_404: function (req, res) {
        res.render('admin/admin-404', {});
    },
    admin_form: function (req, res) {
        res.render('admin/admin-form', {});
    },
    admin_gallery: function (req, res) {
        res.render('admin/admin-gallery', {});
    },
    admin_help: function (req, res) {
        res.render('admin/admin-help', {});
    },
    admin_log: function (req, res) {
        res.render('admin/admin-log', {});
    },
    admin_table: function (req, res) {
        res.render('admin/admin-table', {});
    },
    admin_user: function (req, res) {
        res.render('admin/admin-user', {});
    },
    admin_index: function (req, res) {
        res.render('admin/admin-index', {});
    }
};
