--- TODO: create migrations for this view/functions

CREATE OR REPLACE VIEW vw_player_sessions AS
SELECT 
    s.created_at AS date, 
    b.play_session_id,
    b.player_id,
    p.name AS player_name,
	s.playing_group_id,
	SUM(b.amount)::numeric AS amount
FROM weeklyscore.buyin b
JOIN weeklyscore.player p ON b.player_id = p.id
JOIN weeklyscore.play_session s ON b.play_session_id = s.id
GROUP BY 
	b.play_session_id, 
	b.player_id, 
	s.created_at,
	p.name,
	s.playing_group_id;


COMMENT ON VIEW vw_player_sessions IS E'@name player_winning';


CREATE OR REPLACE FUNCTION public.get_player_scores(
	start_date date,
	end_date date,
	playing_group_id uuid)
    RETURNS TABLE(player_id uuid, player_name text, total numeric) 
    LANGUAGE 'plpgsql'
    COST 100
    STABLE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT s.player_id, p.name::TEXT AS player_name, s.total
    FROM weeklyscore.player p
    JOIN (
        SELECT b.player_id, SUM(b.amount) AS total
        FROM weeklyscore.buyin b
        JOIN weeklyscore.play_session s ON s.id = b.play_session_id
        WHERE s.playing_group_id = get_player_scores.playing_group_id
          AND s.created_at BETWEEN start_date AND end_date
        GROUP BY b.player_id
    ) s ON p.id = s.player_id
    ORDER BY s.total DESC;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.get_session_total_winnings(
	start_date date,
	end_date date,
	playing_group_id uuid)
    RETURNS TABLE(play_session_id uuid, created_at timestamp without time zone, total_winnings numeric) 
    LANGUAGE 'plpgsql'
    COST 100
    STABLE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT b.play_session_id, s.created_at, SUM(b.amount) AS total_winnings
    FROM weeklyscore.buyin b
    JOIN weeklyscore.play_session s ON s.id = b.play_session_id
    WHERE s.playing_group_id = get_session_total_winnings.playing_group_id
      AND b.amount > 0
      AND s.created_at BETWEEN start_date AND end_date
    GROUP BY b.play_session_id, s.created_at
    ORDER BY  s.created_at;
END;
$BODY$;



