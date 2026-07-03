"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Users } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QueryError } from "@/components/ui/query-error";
import { apiFetch } from "@/lib/api";
import type { AvailableMember, Department, Employee } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";

export default function EmployeesPage() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const permissions = useAuthStore((s) => s.permissions);
  const canCreate = permissions.includes("employees:create");

  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState<"new" | "existing">("new");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [memberId, setMemberId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { data: employees, isLoading, isError, error: fetchError } = useQuery({
    queryKey: ["employees"],
    queryFn: () => apiFetch<Employee[]>("/employees", { token: accessToken! }),
    enabled: !!accessToken,
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => apiFetch<Department[]>("/departments", { token: accessToken! }),
    enabled: !!accessToken && showForm,
  });

  const { data: availableMembers } = useQuery({
    queryKey: ["available-members"],
    queryFn: () =>
      apiFetch<AvailableMember[]>("/employees/available-members", { token: accessToken! }),
    enabled: !!accessToken && showForm && mode === "existing",
  });

  const mutation = useMutation({
    mutationFn: () =>
      apiFetch<Employee>("/employees", {
        method: "POST",
        token: accessToken!,
        body: JSON.stringify({
          ...(mode === "new"
            ? { email, password }
            : { memberId }),
          departmentId: departmentId || undefined,
          jobTitle: jobTitle || undefined,
          employeeNumber: employeeNumber || undefined,
        }),
      }),
    onSuccess: () => {
      setEmail("");
      setPassword("");
      setMemberId("");
      setDepartmentId("");
      setJobTitle("");
      setEmployeeNumber("");
      setShowForm(false);
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["available-members"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Employés</h1>
          <p className="text-slate-400">Gérez les profils et affectations de votre équipe</p>
        </div>
        {canCreate && (
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
        )}
      </div>

      {showForm && canCreate && (
        <Card>
          <div className="mb-4 flex gap-2">
            <Button
              type="button"
              variant={mode === "new" ? "primary" : "outline"}
              onClick={() => setMode("new")}
            >
              Nouveau compte
            </Button>
            <Button
              type="button"
              variant={mode === "existing" ? "primary" : "outline"}
              onClick={() => setMode("existing")}
            >
              Membre existant
            </Button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
            className="space-y-4"
          >
            {mode === "new" ? (
              <>
                <div>
                  <label className="mb-1 block text-sm text-slate-300">Email</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-300">Mot de passe</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="mb-1 block text-sm text-slate-300">Membre</label>
                <select
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 text-sm text-slate-100 outline-none focus:border-sky-400"
                >
                  <option value="">Sélectionner...</option>
                  {availableMembers?.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.user.email} ({m.role?.name ?? "Membre"})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm text-slate-300">Département</label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 text-sm text-slate-100 outline-none focus:border-sky-400"
              >
                <option value="">Aucun</option>
                {departments?.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-slate-300">Poste</label>
                <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Développeur" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-300">Matricule</label>
                <Input
                  value={employeeNumber}
                  onChange={(e) => setEmployeeNumber(e.target.value)}
                  placeholder="EMP-001"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex gap-2">
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Création..." : "Créer l'employé"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      )}

      {isError && (
        <QueryError message={fetchError instanceof Error ? fetchError.message : "Erreur API"} />
      )}

      <div className="grid gap-3">
        {isLoading && <p className="text-slate-400">Chargement...</p>}
        {employees?.map((emp) => (
          <Card key={emp.id} className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10">
              <Users className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-base">{emp.member.user.email}</CardTitle>
              <CardDescription>
                {emp.jobTitle ?? "Sans poste"}
                {emp.department ? ` · ${emp.department.name}` : ""}
                {emp.employeeNumber ? ` · ${emp.employeeNumber}` : ""}
              </CardDescription>
              {emp.manager && (
                <p className="mt-1 text-xs text-slate-500">
                  Manager : {emp.manager.member.user.email}
                </p>
              )}
            </div>
          </Card>
        ))}
        {!isLoading && !isError && employees?.length === 0 && (
          <Card className="text-center">
            <CardDescription>Aucun employé enregistré</CardDescription>
          </Card>
        )}
      </div>
    </div>
  );
}
