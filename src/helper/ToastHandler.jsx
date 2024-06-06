"use client"

import { useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast"

export function ToastDestructive({ title, description }) {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      variant: "destructive",
      title: title || "Uh oh! Something went wrong.",
      description: description || "There was a problem with your request.",
    })
  }, []);

  return null;
}

export function ToastWithTitle({ title, description }) {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: title || "Uh oh! Something went wrong.",
      description: description || "There was a problem with your request.",
    })
  }, []);

  return null;
}

export function ToastSimple({ description }) {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      className: "bg-green-500 h-[24px] text-white",
      description: description || "The user has been deleted.",
    })
  }, []);

  return null;
}