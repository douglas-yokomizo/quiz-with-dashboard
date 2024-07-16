import { supabase } from "../lib/supabase";

export const fetchActivityByHourFromSupabase = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("start_time, end_time")
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Erro ao buscar atividade por hora:", error);
    return null;
  }

  const activityByHour = Array(24).fill(0);
  data.forEach(({ start_time, end_time }) => {
    const startHour = new Date(start_time).getHours();
    const endHour = new Date(end_time).getHours();
    let currentHour = startHour;

    while (currentHour !== endHour) {
      activityByHour[currentHour]++;
      currentHour = (currentHour + 1) % 24;
    }
    activityByHour[endHour]++;
  });

  return activityByHour;
};

export const fetchTotalUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*", { count: "exact" });

  if (error) {
    console.error("Erro ao buscar total de usuários:", error);
    return null;
  }

  return data.length;
};

export const fetchTotalPlayedTime = async () => {
  const { data, error } = await supabase.from("users").select("played_time");

  if (error) {
    console.error("Erro ao buscar tempo total jogado:", error);
    return null;
  }

  const totalPlayedTime = data.reduce(
    (acc, { played_time }) => acc + played_time,
    0
  );
  return totalPlayedTime;
};

export const fetchQuestionsDetailsByUser = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("id, answer_details");

  if (error) {
    console.error("Erro ao buscar detalhes das perguntas por usuário:", error);
    return null;
  }
  return data;
};
