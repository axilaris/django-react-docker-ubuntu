class MyLocalRouter:

    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'simple':
            return 'mylocaldb'
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if db == 'mylocaldb':
            return False  # Prevent migrations on the read-only database
        return None