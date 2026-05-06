'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.sequelize.query(`
    CREATE OR REPLACE FUNCTION check_journey_before_event_delete()
    RETURNS TRIGGER AS $$
    BEGIN
      IF EXISTS (SELECT 1 FROM "Journeys" WHERE "eventId" = OLD.id AND "isCompleted" = TRUE) THEN
        RAISE EXCEPTION 'Cannot delete Event: Journey is already completed';
      END IF;

      RETURN OLD;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER trigger_delete_event_check_journey
    BEFORE DELETE ON "Events"
    FOR EACH ROW EXECUTE FUNCTION check_journey_before_event_delete();
  `);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.sequelize.query('DROP TRIGGER IF EXISTS trigger_delete_event_check_journey ON "Events";');
}
